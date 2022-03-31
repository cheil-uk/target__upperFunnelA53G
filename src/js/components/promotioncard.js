// ==========================================================================
// Promotioncard functions
// ==========================================================================
import axios from 'axios';

export default class Promotioncard {


    async getFinance() {

        try {
            const response = await axios.get(
                `https://p1-smn2-api.shop.samsung.com/tokocommercewebservices/v2/uk/products/SM-A536BLBNEUB/calculateInstallment?fields=DEFAULT`,
                {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "content-type": "application/json",
                    "x-ecom-app-id": "web",
                  },
                }
            );

            const finance = await response.data;
            // console.log(finance)
            const monthlyPrice = finance.values[1].values[3].periodicValue;
            const duration = finance.values[1].values[3].code;
            this.addPromoFinance(monthlyPrice, duration);

        }
        catch(error) {
            console.log(error);
        }
    }

    async getTradeIn() {

        try {
            const response = await axios.get(
                `https://p1.ecom.samsung.com/v1/exchange/api/gbr/trade-in/sku-devices/uk/SM-X700NZAAEUA`,
                {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "content-type": "application/json",
                    "x-ecom-app-id": "web",
                  },
                }
            );

            const finance = await response.data;
            // console.log(finance)
            // const fullPrice = finance.payment_methods.KSI.finance_plans.sliceit36[0].total_amount;
            // const tradePrice = fullPrice  - 550.00;
            // console.log(fullPrice, tradePrice);
            this.addPromoTradeIn();

        }
        catch(error) {
            console.log(error);
        }
    }

    async getPhoneContracts() {

        try {
            const response = await axios.post(
                `https://www.samsung.com/uk/api/v4/configurator/fetch-finance-product-price`,
                {
                    "skus":["SM-G991BZVDEUA"],
                    "plans":["THREE-108437-0"]
                }

            );

            const data = await response.data;
            const monthlyPrice = response.data["SM-G991BZVDEUA"]["THREE-108437-0"].monthly_rate.value;
            const downPayment = response.data["SM-G991BZVDEUA"]["THREE-108437-0"].down_payment.value
            // console.log(data, monthlyPrice, downPayment);

            this.addPromoPhoneContracts(monthlyPrice, downPayment);
        }

        catch(error) {
            console.log(error);
        }
    }


    addPromoFinance(monthlyPrice, duration) {
        const currentUrl = window.location.pathname;
        const view = screen.width;
        const monthly = monthlyPrice;
        const unit = duration;
        const container = document.querySelector('.js-pf-content-wrap');
        const promoCard = document.createElement('div');
        promoCard.classList.add('pf-finder-v2__box' ,'pf-finder-v2__box-view', 'js-pf-product-card','pf-finder-v2__box-content-card');
        const promoCardContent = `
        <section class="promotion-card-v2 desktop-card-type--large card-theme--black">
            <div class="promotion-card-v2__wrapper finance">
                <div class="promotion-card-v2__image desktop-view">
                    <div class="product-image">
                        <img src="https://images.samsung.com/is/image/samsung/assets/uk/upper-funnel-pfp/a53-5g/Image_Opt_01_2x.png"/ alt="Galaxy A53 5G">
                    </div>
                </div>
                </div>
                <div class="promotion-card-v2__text">
                    <div class="promotion-card-v2__text-container">
                        <h2 class="promotion-card-v2__sub-headline">
                            <span class="promotion-card-v2__sub-headline-text">Galaxy A53 5G</span>
                        </h2>
                        <div class="promotion-card-v2__description">
                            <p class="promotion-card-v2__description-text finance">From just ${monthlyPrice} a month for ${duration} months with 0% finance&#42;</p>
                        </div>
                        <div class="promotion-card-v2__legal-disclaimer">
                            <p>Representative example without 0% offer: Representative 21.9% APR (variable). Purchase interest rate 21.9% p.a. (variable). Assumed credit limit £1,200.
                            </p>
                        </div>
                        <div class="promotion-card-v2__cta-wrapper">
                            <div class="cta-wrap">
                                <div class="promotion-card-v2__cta">
                                   <a href="https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a53-5g-awesome-blue-128gb-sm-a536blbneub/buy/" data-omni-type="microsite" data-omni="uk:pfp:171:finance:optimisations-SM-F926BZKDEUA-finance" class="cta cta--contained cta--black light">Buy now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
        promoCard.innerHTML = `${promoCardContent}`;
        container.appendChild(promoCard);
        const financeInfo = container.querySelector('.promotion-card-v2__description-text');
        financeInfo.innerHTML= `Get the latest Galaxy S21 5G from just £${monthly} a month for ${duration} months with 0% finance.&ast;`;
        // console.log(container.children[4], container.lastChild);
        const termsContainer = document.querySelector('.text-editor__wrap');
        const termsOffer = document.createElement('div');
        termsOffer.innerHTML = `
        <div class="text-editor__contents-wrap">
            <div class="text-editor__column-wrap">
                <div class="text-editor__column text-editor--description-text-size-small">
                &#42;&#42;Subject to status and credit approval. Finance provided by PayPal Credit. Samsung Electronics (UK) Limited acts as a broker and offers finance from a limited number of providers. PayPal Credit is a trading name of PayPal (Europe) S.à r.l. et Cie, S.C.A., 22-24 Boulevard Royal L-2449, Luxembourg. Please be aware that late or missing repayments may also affect your credit rating, which could make it more difficult or expensive for you to obtain credit in the future. T&Cs apply.
                </div>
            </div>
        </div>`;
        termsOffer.classList.add('text-editor__wrap_disclaimer');
        termsContainer.prepend(termsOffer);
        if (currentUrl === '/uk/smartphones/galaxy-note/' && view <= 425) {
            container.insertBefore(container.lastChild, container.children[1]);
        } else if (view <= 425) {
            container.insertBefore(container.lastChild, container.children[2]);
        } else {
            container.insertBefore(container.lastChild, container.children[2]);
        }

    }

    offer() {
        const currentUrl = window.location.pathname;
        const view = screen.width;
        const container = document.querySelector('.js-pf-content-wrap');
        const promoCard = document.createElement('div');
        promoCard.classList.add('pf-finder-v2__box' ,'pf-finder-v2__box-view','pf-finder-v2__box-content-card');
        const promoCardContent = `
        <section class="promotion-card-v2 desktop-card-type--large card-theme--black">
            <div class="promotion-card-v2__wrapper upgrade">
                <div class="promotion-card-v2__image desktop-view">
                    <div class="product-image">
                        <img src="https://images.samsung.com/is/image/samsung/assets/uk/upper-funnel-pfp/tab8sustain_pfp/s8_plus_buds_desktop.png"/ alt="tab s8 and plus buds">
                    </div>
                </div>
                <div class="promotion-card-v2__text">
                    <div class="promotion-card-v2__text-container">
                        <h2 class="promotion-card-v2__sub-headline">
                            <span class="promotion-card-v2__sub-headline-text">Claim free Galaxy Buds Pro</span>
                        </h2>
                        <div class="promotion-card-v2__description">
                            <p class="promotion-card-v2__description-text tradeIn">When you buy an Galaxy Tab S8</p>
                        </div>
                        <div class="promotion-card-v2__cta-wrapper">
                            <div class="cta-wrap">
                                <div class="promotion-card-v2__cta">
                                   <a href="https://www.samsung.com/uk/tablets/galaxy-tab-s8/buy/?modelCode=SM-X900NZAAEUA" data-omni-type="microsite" data-omni="uk:pfp:48:offer:optimisations-SM-X900NZAAEUA-offer" class="cta cta--contained cta--black light">Buy</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
        promoCard.innerHTML = `${promoCardContent}`;
        container.appendChild(promoCard);
        const termsContainer = document.querySelector('.text-editor__wrap');
        const termsOffer = document.createElement('div');
        termsOffer.innerHTML = `
        <div class="text-editor__contents-wrap">
            <div class="text-editor__column-wrap">
                <div class="text-editor__column text-editor--description-text-size-small">
                &#42;Promoter: Samsung Electronics (UK) Limited. UK, Isle of Man, Channel Islands or Republic of Irelandresidents (18+ only) and registered companies. Purchase a new Samsung Galaxy Tab S8+ or Tab S8 Ultra between 25/02/2022 – 05/04/2022 from a participating retailer. Claims must be made at www.samsungpromotions.claims/galaxylaunchoffers within 60 days of purchase.
                Maximum 1 claim per purchase (max 4 per household) and 250 claims per company participant. See www.samsungpromotions.claims/galaxylaunchoffers for full T&Cs.
                </div>
            </div>
        </div>`;
        termsOffer.classList.add('text-editor__wrap_disclaimer');
        termsContainer.prepend(termsOffer);
        // console.log(container.children[4], container.lastChild);
        if (currentUrl === '/uk/smartphones/galaxy-note/' && view <= 425) {
            container.insertBefore(container.lastChild, container.children[1]);
        } else {
            container.insertBefore(container.lastChild, container.children[4]);
        }

    }

    addPromoTradeIn() {
        const currentUrl = window.location.pathname;
        const view = screen.width;
        const container = document.querySelector('.js-pf-content-wrap');
        const promoCard = document.createElement('div');
        promoCard.classList.add('pf-finder-v2__box' ,'pf-finder-v2__box-view','pf-finder-v2__box-content-card');
        const promoCardContent = `
        <section class="promotion-card-v2 desktop-card-type--large card-theme--black">
            <div class="promotion-card-v2__wrapper tradeIn">
                <div class="promotion-card-v2__image desktop-view">
                    <div class="product-image">
                        <img src="https://images.samsung.com/is/image/samsung/assets/uk/upper-funnel-pfp/a53-5g/Image_Opt_01_2x.png"/ alt="A53 5G phones">
                    </div>
                </div>
                <div class="promotion-card-v2__text">
                    <div class="promotion-card-v2__text-container">
                        <h2 class="promotion-card-v2__sub-headline">
                            <span class="promotion-card-v2__sub-headline-text">Galaxy A53 5G</span>
                        </h2>
                        <div class="promotion-card-v2__description">
                            <p class="promotion-card-v2__description-text tradeIn">Up to £160 off the new Galaxy A53 5G with Trade In*</p>
                            <p class="promotion-card-v2__description-text">Get an instant discount on your order</p>
                        </div>
                        <div class="promotion-card-v2__cta-wrapper">
                            <div class="cta-wrap">
                                <div class="promotion-card-v2__cta">
                                   <a href="https://www.samsung.com/uk/smartphones/galaxy-a/galaxy-a53-5g-awesome-blue-128gb-sm-a536blbneub/buy/" data-omni-type="microsite" data-omni="uk:pfp:171:trade in:optimisations-sm-a536blbneub-tradeIn" class="cta cta--contained cta--black light">Buy now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
        promoCard.innerHTML = `${promoCardContent}`;
        container.appendChild(promoCard);
        // const price = tradePrice.toFixed(2);
        // const priceInfo = container.querySelector('.price');
        // priceInfo.textContent = `£${price}`;
        const termsContainer = document.querySelector('.text-editor__wrap');
        const termsOffer = document.createElement('div');
        termsOffer.innerHTML = `
        <div class="text-editor__contents-wrap">
            <div class="text-editor__column-wrap">
                <div class="text-editor__column text-editor--description-text-size-small">
                &#42;&#42;&#42;Purchase from Samsung Shop Online by 31/03/22. £450 value based on iPad Pro 5. Values can vary based on model and condition of trade-in device, and on purchases of exclusive colour devices. Purchased tablet will be blocked if you don't send us your trade-in device. T&Cs apply.
                </div>
            </div>
        </div>`;
        termsOffer.classList.add('text-editor__wrap_disclaimer');
        termsContainer.prepend(termsOffer);
        // console.log(container.children[4], container.lastChild);
        if (view <= 425) {
            container.insertBefore(container.lastChild, container.children[2]);
            const image = promoCard.querySelector('.product-image > img');
            container.insertBefore(container.lastChild, container.children[2]);
            image.setAttribute('src', 'https://images.samsung.com/is/image/samsung/assets/uk/upper-funnel-pfp/a53-5g/Image_Opt_01_3x.png');
        } else {
            container.insertBefore(container.lastChild, container.children[2]);
        }
    }

    removePreOrder() {
        const mainPfpromo = document.querySelectorAll('.pf-finder-v2__box-content-card');
        mainPfpromo.forEach((mainPf) => {
            if (mainPf.childNodes.length === 5) {
                mainPf.style.display = 'none';
            }
        })
    }
}
