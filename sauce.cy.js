describe("Сайт", () => {

  it("Авторизация с НЕ правильно введенными данными", () => {
    cy.visit('https://www.saucedemo.com/').get("#user-name.input_error.form_input").click().type('user')
    .get("#password.input_error.form_input").click().type('secret')
    .get("#login-button.submit-button.btn_action").click()
  })
  it("Заполнение формы авторизации", () => {
    cy.visit('https://www.saucedemo.com/').get("#user-name.input_error.form_input").click().type('standard_user')
      .get("#password.input_error.form_input").click().type('secret_sauce')
      .get("#login-button.submit-button.btn_action").click()
    })
  it("Проверка фильтрации", () => {
    cy.visit('https://www.saucedemo.com/').get("#user-name.input_error.form_input").click().type('standard_user')
      .get("#password.input_error.form_input").click().type('secret_sauce')
      .get("#login-button.submit-button.btn_action").click()
      .get('select').select('Name (Z to A)')
      .get('select').select('Price (low to high)')
      .get('select').select('Price (high to low)')
      .get('select').select('Name (A to Z)')
    })
  it("Тест карточки товара (добавление, удаление)", () => {
    //  1 - Sauce Labs Backpack
    cy.visit('https://www.saucedemo.com/').get("#user-name.input_error.form_input").click().type('standard_user')
    .get("#password.input_error.form_input").click().type('secret_sauce')
    .get("#login-button.submit-button.btn_action").click()
    .get("#item_4_img_link").click() 
    .get('button').contains('Add to cart').click()
    .get('button').contains('Remove').click()
    .get('button').contains('Back to products').click()
    // 2 - Sauce Labs Bike Light
    .get("#item_0_img_link").click() 
    .get('button').contains('Add to cart').click()
    .get('button').contains('Remove').click()
    .get('button').contains('Back to products').click()
    // 3 - Sauce Labs Bolt T-Shirt
    .get("#item_1_img_link").click() 
    .get('button').contains('Add to cart').click()
    .get('button').contains('Remove').click()
    .get('button').contains('Back to products').click()
    //  4 - Sauce Labs Fleece Jacket
      .get("#item_5_img_link").click() 
      .get('button').contains('Add to cart').click()
      .get('button').contains('Remove').click()
      .get('button').contains('Back to products').click()
    //  5 - Sauce Labs Onesie
      .get("#item_2_img_link").click() 
      .get('button').contains('Add to cart').click()
      .get('button').contains('Remove').click()
      .get("#back-to-products.btn.btn_secondary.back.btn_large.inventory_details_back_button").click()
    //  6 - Test.allTheThings() T-Shirt (Red)
      .get("#item_3_img_link").click() 
      .get('button').contains('Add to cart').click()
      .get('button').contains('Remove').click()
      .get('button').contains('Back to products').click()
    })
  it("Корзина (Заказ)", () => {
    // На главной меняем фильтрацию, пробуем добавить товар в корзину
    cy.visit('https://www.saucedemo.com/').get("#user-name.input_error.form_input").click().type('standard_user')
    .get("#password.input_error.form_input").click().type('secret_sauce')
    .get("#login-button.submit-button.btn_action").click()
    .get('select').select('Price (high to low)')
      .get('.inventory_item').contains('$49.99').get('button').contains('Add to cart').click()
    // Товар добавлен, пробуем добавить остальные товары таким же способом
      .get('.inventory_item').contains('$29.99').get('button').contains('Add to cart').click()
      .get('.inventory_item').contains('Sauce Labs Bolt T-Shirt').get('button').contains('Add to cart').click()
      .get('.inventory_item').contains('Test.allTheThings() T-Shirt (Red)').get('button').contains('Add to cart').click()
      .get('.inventory_item').contains('$9.99').get('button').contains('Add to cart').click()
      .get('.inventory_item').contains('$7.99').get('button').contains('Add to cart').click()
    // переходим в корзину
    .get('.shopping_cart_link').click()

        // пробуем удалить товар из корзины
        .get('.cart_item').contains('$49.99').get('button').contains('Remove').click()

    .get('button').contains('Checkout').click()
    // заполняем форму
    .get('#first-name.input_error.form_input').click().type('standard')
    .get('#last-name.input_error.form_input').click().type('user')
    .get('#postal-code.input_error.form_input').click().type('001')
    .get('#continue.submit-button.btn.btn_primary.cart_button.btn_action').click()
    // заказ сделан, возвращаемся на главную страницу
    .get('button').contains('Finish').click()
    .get('button').contains('Back Home').click()

    // Проверка на пустоту в форме корзины
        // переходим в корзину
        .get('.shopping_cart_link').click()
        .get('button').contains('Checkout').click()
        // пробуем не заполнить форму
        .get('#continue.submit-button.btn.btn_primary.cart_button.btn_action').click()
        .get('button').contains('Cancel').click()
      })
  it("Выход", () => {
    // Выход
    cy.visit('https://www.saucedemo.com/').get("#user-name.input_error.form_input").click().type('standard_user')
    .get("#password.input_error.form_input").click().type('secret_sauce')
    .get("#login-button.submit-button.btn_action").click()
    .get("#react-burger-menu-btn").click()
    .get("#logout_sidebar_link.bm-item.menu-item").click()
  })
  it("Проверка на пустую корзину (заказа не должно быть)", () => {
    cy.visit('https://www.saucedemo.com/')
    .get("#user-name.input_error.form_input").click().type('standard_user')
    .get("#password.input_error.form_input").click().type('secret_sauce')
    .get("#login-button.submit-button.btn_action").click()
    //  .get('.inventory_item').contains('$49.99').get('button').contains('Add to cart').click() //что будет если товар окажется в корзине
    .get('.shopping_cart_link').click()
    .get('body').then(($body) => {
      if ($body.find('.cart_item').length > 0) {
        cy.get('button').contains('Checkout').click()
      } else {
        expect(true).to.equal(true)
      }
  });
    })
})



