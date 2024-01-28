Feature: Atualização do Status de Pagamento via Webhook

  Scenario: Deve atualizar status de pagamento
    When uma requisição é recebida pelo webhook contendo uma notificação e um id de pedido válidos
    And o novo status do pagamento é obtido e informado ao serviço order
    Then a atualização de status de pagamento ocorre sem erros
  
  Scenario: Não deve atualizar status de pagamento se não puder obter status
    When uma requisição é recebida pelo webhook contendo uma notificação e um id de pedido válidos
    And ocorre um erro ao solicitar status à plataforma de pagamentos
    Then a atualização de status resulta em erro com a mensagem 'Error getting payment status from platform'
  
  Scenario: Não deve atualizar status de pagamento ao receber requisição sem um orderId válido
    When uma requisição é recebida pelo webhook sem o parâmetro orderId ou ele é inválido
    Then a atualização de status resulta em erro com a mensagem 'Invalid order id'

  Scenario: Não deve atualizar status de pagamento se não conseguir conectar-se ao serviço order
    When uma requisição é recebida pelo webhook contendo uma notificação e um id de pedido válidos
    And ocorre um erro ao informar novo status ao serviço order
    Then a atualização de status resulta em erro com a mensagem 'Cannot update order service'
  