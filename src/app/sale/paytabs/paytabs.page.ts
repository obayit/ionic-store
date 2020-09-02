import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
declare var Paytabs;

export class PaytabsParam{
  amount: number;
  currency: string;
  title: string;
  product_names: string;
  order_id: string;
  url_redirect: string;
  display_customer_info: string = '1';
  display_billing_fields: string = '1';
  display_shipping_fields: string = '0';
  language: string = 'ar';
  redirect_on_reject: string = '1';

  customer_first_name: string;
  customer_last_name: string;
  customer_phone_number: string;
  customer_email_address: string;
  customer_country_code: string;

  billing_full_address?: string;
  billing_city?: string;
  billing_state?: string;
  billing_country?: string;
  billing_postal_code?: string;

  shipping_first_name?: string;
  shipping_last_name?: string;
  full_address_shipping?: string;
  city_shipping?: string;
  state_shipping?: string;
  country_shipping?: string;
  postal_code_shipping?: string;
}

@Component({
  selector: 'app-paytabs',
  templateUrl: './paytabs.page.html',
  styleUrls: ['./paytabs.page.scss'],
})
export class PaytabsPage implements OnInit {

  title = 'باي تابس'
  paytabsParam = new PaytabsParam();

  constructor(
    private renderer: Renderer2,
    private readonly elementRef: ElementRef,
    ) {
    // default values for easy testing
    this.paytabsParam.amount = 99.99;
    this.paytabsParam.currency = 'AED';
    this.paytabsParam.title = 'Mr. Ahmed';
    this.paytabsParam.product_names = 'prod1,prod2';
    this.paytabsParam.order_id = '1234';
    this.paytabsParam.url_redirect = window.location.href;
    this.paytabsParam.display_customer_info = '1';
    this.paytabsParam.display_billing_fields = '1';
    this.paytabsParam.display_shipping_fields = '0';
    this.paytabsParam.language = 'ar';
    this.paytabsParam.redirect_on_reject = '0';
    this.paytabsParam.customer_first_name = 'Mohamed';
    this.paytabsParam.customer_last_name = 'Ahmed';
    this.paytabsParam.customer_phone_number = '0127169223';
    this.paytabsParam.customer_email_address = 'obayit@gmail.com';
    this.paytabsParam.customer_country_code = '971';
    this.paytabsParam.billing_country = 'ARE';
    this.paytabsParam.billing_full_address = 'Street X';
    this.paytabsParam.billing_city = 'Dubai';
    this.paytabsParam.billing_state = 'Dubai';
    this.paytabsParam.billing_postal_code = '11111';
  }

  merchant_id = "PLACE MERCHANT ID HERE";
  secret_key = "PLACE SECRET KEY HERE";
  ngOnInit() {
    const script = this.renderer.createElement('script');
    script.src = 'https://paytabs.com/express/v4/paytabs-express-checkout.js';
    // script['id'] = 'paytabs-express-checkout';
    this.renderer.setAttribute(script, 'id', 'paytabs-express-checkout');
    this.renderer.setAttribute(script, 'data-secret-key', this.secret_key);
    this.renderer.setAttribute(script, 'data-merchant-id', this.merchant_id);
    // this.renderer.setAttribute(script, 'data-url-redirect', window.location.href);
    // this.renderer.setAttribute(script, 'data-url-redirect', "http://loalhost");
    this.renderer.setAttribute(script, 'data-url-redirect', this.paytabsParam.url_redirect);
    this.renderer.setAttribute(script, 'data-amount', this.paytabsParam.amount+'');
    this.renderer.setAttribute(script, 'data-currency', this.paytabsParam.currency);
    this.renderer.setAttribute(script, 'data-title', this.paytabsParam.title);
    this.renderer.setAttribute(script, 'data-product-names', this.paytabsParam.product_names);
    this.renderer.setAttribute(script, 'data-order-id', this.paytabsParam.order_id);
    this.renderer.setAttribute(script, 'data-customer-phone-number', this.paytabsParam.customer_phone_number);
    this.renderer.setAttribute(script, 'data-customer-email-address', this.paytabsParam.customer_email_address);
    this.renderer.setAttribute(script, 'data-customer-country-code', this.paytabsParam.customer_country_code);
    this.renderer.setAttribute(script, 'data-language', this.paytabsParam.language);

    this.renderer.setAttribute(script, 'data-billing-country', this.paytabsParam.billing_country);
    this.renderer.setAttribute(script, 'data-billing-full-address', this.paytabsParam.billing_full_address);
    this.renderer.setAttribute(script, 'data-billing-city', this.paytabsParam.billing_city);
    this.renderer.setAttribute(script, 'data-billing-state', this.paytabsParam.billing_state);
    this.renderer.setAttribute(script, 'data-billing-postal-code', this.paytabsParam.billing_postal_code);

    // HERE IS WHERE I SET id-self = '1'
    this.renderer.setAttribute(script, 'data-is-self', "1");

    console.log(script);
    script.onload = () => {
      Paytabs.openPaymentPage();
    }
    this.renderer.appendChild(this.elementRef.nativeElement, script);

    // paytabs v3 code
    // Paytabs.expresscheckout({
    //     settings: {
    //         merchant_id: this.merchant_id,
    //         secret_key: this.secret_key,
    //         amount: this.paytabsParam.amount,
    //         currency: this.paytabsParam.currency,
    //         title: this.paytabsParam.title,
    //         product_names: this.paytabsParam.product_names,
    //         order_id: this.paytabsParam.order_id,
    //         url_redirect: this.paytabsParam.url_redirect,
    //         display_customer_info: this.paytabsParam.display_customer_info,
    //         display_billing_fields: this.paytabsParam.display_billing_fields,
    //         display_shipping_fields: this.paytabsParam.display_shipping_fields,
    //         language: this.paytabsParam.language,
    //         redirect_on_reject: this.paytabsParam.redirect_on_reject,
    //         is_iframe: {
    //             load: "onbodyload",
    //             show: 1
    //         },
    //         is_self: 1,
    //         url_cancel: "http://localhost/callback.php?t=cancel"
    //     },
    //     customer_info: {
    //         first_name: this.paytabsParam.customer_first_name,
    //         last_name: this.paytabsParam.customer_last_name,
    //         phone_number: this.paytabsParam.customer_phone_number,
    //         email_address: this.paytabsParam.customer_email_address,
    //         country_code: this.paytabsParam.customer_country_code,
    //     },
    //     // billing_address: {
    //     //     full_address: this.paytabsParam.billing_full_address,
    //     //     city: this.paytabsParam.billing_city,
    //     //     state: this.paytabsParam.billing_state,
    //     //     country: this.paytabsParam.billing_country,
    //     //     postal_code: this.paytabsParam.billing_postal_code
    //     // },
    //     // shipping_address: {
    //     //     shipping_first_name: this.paytabsParam.shipping_first_name,
    //     //     shipping_last_name: this.paytabsParam.shipping_last_name,
    //     //     full_address_shipping: this.paytabsParam.full_address_shipping,
    //     //     city_shipping: this.paytabsParam.city_shipping,
    //     //     state_shipping: this.paytabsParam.state_shipping,
    //     //     country_shipping: this.paytabsParam.country_shipping,
    //     //     postal_code_shipping: this.paytabsParam.postal_code_shipping
    //     // },
    // });
  }

}
