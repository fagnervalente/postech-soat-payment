Feature: Processo de Checkout

  Scenario: Criar pagamento
    When uma requisição de checkout é recebida com orderId e amount válidos
    Then os dados do qr code de pagamento são retornados

  Scenario: Não deve criar um pagamento ao receber requisição sem um orderId válido
    When uma requisição de checkout é recebida sem o parâmetro orderId ou ele é inválido
    Then deve ocorrer um erro com a mensagem 'Invalid order id'

  Scenario: Não deve criar um pagamento ao receber requisição sem um amount válido
    When uma requisição de checkout é recebida sem o parâmetro amount ou ele é inválido
    Then deve ocorrer um erro com a mensagem 'Invalid amount'

  Scenario: Não conseguir comunicar-se com a plataforma de pagamentos
    When uma requisição de checkout é recebida
    And a comunicação com a plataforma de pagamentos resulta em erro
    Then deve ocorrer um erro com a mensagem 'Error connecting to payment platform'
