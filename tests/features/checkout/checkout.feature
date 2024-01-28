Feature: Processo de Checkout

  Scenario: Criar pagamento
    When uma requisição de checkout é recebida com orderId e amount válidos
    Then os dados do qr code de pagamento são retornados

  Scenario: Não deve criar um pagamento ao receber requisição sem um orderId válido
    When uma requisição de checkout é recebida sem o parâmetro orderId ou ele é inválido
    Then o checkout resulta em um erro com a mensagem 'Invalid order id'

  Scenario: Não deve criar um pagamento ao receber requisição sem um amount válido
    When uma requisição de checkout é recebida sem o parâmetro amount ou ele é inválido
    Then o checkout resulta em um erro com a mensagem 'Invalid amount'

  Scenario: Não deve criar um pagamento se não conseguir comunicar-se com a plataforma de pagamentos
    When uma requisição de checkout é recebida
    And ocorre um erro ao solicitar criação à plataforma de pagamentos
    Then o checkout resulta em um erro com a mensagem 'Error connecting to payment platform'
