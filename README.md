## **Admin**

- [I will provide you with this frontend template](https://pixinvent.com/demo/vuexy-html-bootstrap-admin-template/html/rtl/vertical-menu-template-bordered/)
- CMS
  - ordinary CMS features
  - navigation structure [see example](https://demo.saleor.io/dashboard/navigation/TWVudTox)
  - create additional pages and urls [see example](https://demo.saleor.io/dashboard/pages/add)
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
- (new)reviews and comments management
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
  - sales (can apply percentage to see net profit)
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
- email (social login)
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
    - (new) store sponsorship settings
      - tier
      - period
      - price
      - features
      - upgrade options
    - (new) individual products sponsorship settings
      - can select any product and sponsor it with certain tier
      - tier
      - price
      - period
      - features
      - upgrade options
  - store phone number
  - social links
  - opening/closing times (for physical stores)
  - shipping details
    - handled by app or by vendor (if by vendor):
      - shipping company name
      - rate per every city

## **User**(features for User experience) :

- [I will provide you with this frontend template](https://cartzilla.createx.studio/home-electronics-store.html)
- pwa installable (offline support/save guest properties locally like address)
- guest or sign up by number/social/email
- main page lead to auction or marketplace pages
- powerful search engine (algolia) autocomplete/autosuggestion/autocorrection
- view items (inserted by vendor in USD) by both USD and IQD
- vendor page has rating/reviews/comment/number of followers/number of sales/products
- product page has rating/reviews/comment/number of sales/all properties/images/videos/360view/link to share products to social networks
- layered navigation/breadcrumbs/sitemap
- live chat with vendor/admin (cost of your setup vs third part integration)
- auction products page has (in addition to regular properties)/NO. of views/history of bids/user can set bid amount & submit bid
- user can follow auctions until they end
- user can follow vendors and like them
- user can follow category/subcategory
- user can add product to wishlist
- profile with orders/wishlist/followed vendors/returned items
- can checkout as registered user/guest (guest checkout requires number and address only)
- can view related products

## **Product** (every product has these properties) :

- title
- description
- vendor
- country of origin
- currency (two currencies only => USD/IQD)
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
  - pdf (like a brochure)
- bundle or not
  - other products in bundle
  - bundle price
- specifications/technical details
- sponsored or not/sponsering budget (to be featured in home page and search results according to amount)
- warranty
- available for purchase
- return policy
- number of sales
- state (pending or published after approval by admin)
- (can add future properties through admin dashboard)

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
- user phone number (guest or registered)
- user address (google map)
- vendor name
- vendor address (google map)
- products and quantity
- shipping details
  - company
  - rate
- price without shipping
- total price with shipping
- status
  - received by shipping company
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

(new)


## **Shipping** 
- the shipping is handled outside the platform
- the shipping company we will deal with can log in into separate portal in which they will view the orders (which are not handled by vendors own company ) and can change their status like delivered and canceled and so on
- the account which the shipping company will use will be given the role of shipping company (in the roles and permission in the admin section) and the related permissions to view and edit orders


---

---

# Notes :

## **_- I will use Arabic (RTL) as main language so every word used on site can be translated in a separate file and loaded accordingly_**

## **_- The app must be PWA and can be installed from browser_**

## **_- The app must support Server side rendering_**

## **_- Backend is Google Firebase_**

## **_- Frontend framework is Vue.js_**

## **_- code must be optimized for firebase pricing without sacrificing functionality_**

## **_- must be designed for future upgrades and adding new features must be without much difficulty_**

## **_- this project is one of 7 projects, our company seeks turning them to separate web apps and we need them to be in the same look and feel and more importantly the user can login into any one of them with same credentials ( we also have job board , real estate agency and pharmacy marketplace among other projects in process )_**

## **_- the frontend should be optimized for RTL language and every page in the web app should be reviewed for design and RTL integrity _**

## **_- further discussions, suggestions and requirements are accepted_**
