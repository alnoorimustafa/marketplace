# Notes :

## **_- I will use Arabic (RTL) as main language so every word used on site can be translated in a separate file and loaded accordingly_**

## **_- The app must be PWA and can be installed from browser_**

## **_- we have a very weak internet speed in our country SO using Server side rendering or similar solution  _**

## **_- Backend is Google Firebase/firestore/cloud functions/analytics , what is your database suggestion ? _**

## **_- Frontend framework is Vue.js_**

## **_- code must be optimized for firebase pricing without sacrificing functionality_**

## **_- must be designed for future upgrades and adding new features must be without much difficulty_**

## **_- the frontend should be optimized for RTL language and i could help in design (i have medium knowledge in css and vue) using templates provided_**

## **_- further discussions, suggestions and requirements are helpful_**

## **Admin**

- [I will provide you with this frontend template](https://pixinvent.com/demo/vuexy-html-bootstrap-admin-template/html/rtl/vertical-menu-template-bordered/)
- Live chat(vendors and buyers)
- Account management
  - searchable/filterable list of users and their details
  - add/delete/update users
  - roles and permissions
- Vendor management
  - searchable/filterable list of vendors ( in addition to vendor properties also) :
    - verification status
      - verified (shows badge on vendor)
        - type of verification (manual text)
      - not verified
  - pending vendors
  - sponsorship setting
    - sponsorship types (every type has these properties)
      - name
      - price per period
      - features included
  - subscription setting
    - payment amount and period for every store type
    - store type configurations (every type has these settings)
      - allowed number of products
      - allowed social links
      - commission fee percentage
      - can be followed
      - can add 360 views
      - can view analytics
- Category Management
  - searchable/filterable list of categories and subcategories
  - create category/subcategory
  - view number of vendors in every category
  - view number of products in every category
  - pending category suggestions
- Attributes Management
  - searchable/filterable list of attributes
  - create/delete/update attributes
  - pending attribute suggestions
- Product management
  - searchable/filterable list of products
  - create/delete/update individual/batch product(s)
  - pending products list
  - product properties setting
    - currency conversion rate
    - can add/remove properties
    - can edit any existed property
- Auction management
  - searchable/filterable list of auctions(ongoing/ended)
  - pending auctions
  - auction settings
    - commission fee setup
- Order management
  - searchable/filterable list of orders
  - create/delete/update orders
  - orders with issues
- reviews and comments management
  - can view every comment and review
  - delete reviews or comments
- Discounts/Voucher/Coupon management
  - view list of active discount/voucher/coupon
  - pending discount/voucher/coupon
- Analytics
  - users
    - number of vendors
    - number of users registered
    - number of daily active users
  - sales and net profit
    - from auctions
    - according to product
    - according to city
    - according to vendor
    - according to category
- Settings
  - pending setting:
    - manual or auto for any of (products/attributes/categories/vendors/auctions)
    -

## **Account** (every registered account has) :

- name
- phone number (mandatory)
- location
- role
  - vendor
  - buyer
  - moderator
- optional : email or (social login)
- password

## **Vendor dashboard** (features for vendor experience) :

- simple analytics
  - Revenue
  - NO. of likes
  - NO. of followers
- products
  - create/update/delete products
  - edit product description like a md file with images too
  - if auction item added its related properties and commission fee shows
- orders
- announcements/offers (line or two viewed by users in vendor page)
- reviews
- ratings
- comments
- discounts setting
  - products to discount/percentage of discount
- number of followers
- return policy setting
  - has return policy or not
  - its details if present
- settings
  - store logo
  - store banner
  - store address
  - store name
  - store category
  - store payments
    - subscription details
      - tier
      - period
      - price
      - features
      - upgrade option
    - store sponsorship settings
      - tier
      - period
      - price
      - features
      - upgrade options
    - individual products sponsorship settings
      - can select any product and sponsor it with certain tier
      - tier
      - price
      - period
      - features
      - upgrade options
  - store phone number
  - social links
  - opening/closing times (for physical stores)
  - delivery details
    - handled by app or by vendor (if by vendor):
      - delivery company name
      - rate per every city

## **User** (features for User experience) :

- [I will provide you with this frontend template](https://cartzilla.createx.studio/home-electronics-store.html)
- pwa installable (offline support/save guest properties locally like address)
- guest or sign up by number/social/email
- main page lead to auction or marketplace pages
- powerful search engine (algolia) autocomplete/autosuggestion/autocorrection
- vendor page has rating/reviews/comment/number of followers/number of sales/products
- product page has rating/reviews/comment/number of sales/all properties/images/videos/360view/link to share products to social networks
- layered navigation/breadcrumbs/sitemap
- live chat with vendor/admin (from scratch or using a plugin)
- auction products page has (in addition to regular product properties)/NO. of views/history of bids/user can set bid amount & submit bid
- user can follow auctions until they end
- user can follow vendors and like them
- user can follow category/subcategory
- user can add product to wishlist
- profile with orders/wishlist/followed vendors/returned items
- can checkout as registered user/guest (guest checkout requires number and address only)
- can view related products

## **Product** (every product has these properties) : filled by admin or vendor :

- title
- description
- vendor
- price
- country of origin
- address (same as vendor or else (google map location))
- attributes
- category
- variants
- tags
- type
  - new
  - used
  - auction
  - rental
  - subscription
  - donation
  - virtual (services/downloadable)
- minimum/maximum quantity
- preview
  - multiple images
  - video
  - 360 view
- specifications/technical details
- sponsored or not
- sponsoring tier (to be featured in home page and search results according to tier chosen)
- warranty
- return policy
- number of sales
- ///////////////////
- state (pending or published after approval by admin)
- available or not for purchase (can be set on product listing page in vendor dashboard)

## **Attribute** (every attribute has these properties) :

- name (like weight)
- unit type (kg/gram for validation)
- upper/lower limit (like 1-1000 for validation)
- value (like 10 kg)

## **Category** (every category has these properties) :

- icon
- name
- list of vendors ( who has products in this category )
- subcategories (every subcategory has) :
  - icon
  - name

## **Order** (every order has these properties) :

- date
- username (auto for registered/manual for guest)
- user phone number (auto for registered/manual for guest)
- user address
  - city (from dropdown)
  - (gps coordinates)
- vendor name
- vendor address (gps coordinates)
- products and quantity
- delivery details
  - company
  - rate
- price without delivery
- total price with delivery
- status (can be changed by delivery company)
  - received by delivery company
  - pending delivery
  - delivered
  - canceled

## **Auction** (every auction has these properties) :

- product (ordinary details in addition to) :
- starting price
- buy now price
- start time
- end time
- time counter (displayed in auction page)
- bid history/bidders
- NO. of views
- NO. of bidders
- (after auction ends the product page shows only the views/winning bid/end date)

## **delivery**

- the delivery is handled outside the platform
- the delivery company we will deal with can log in into separate page in which they will view the orders (which are not handled by vendors own company ) and can change their status like delivered and canceled and so on
- the account which the delivery company will use will be given the role of delivery company (in the roles and permission in the admin section) and the related permissions to view and edit orders

---

---
