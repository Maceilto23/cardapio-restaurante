<?php
$arquivo = 'cardapio.json';
$mensagem = '';

// Lê o JSON atual
$conteudo = file_get_contents($arquivo);
$cardapioJSON = json_decode($conteudo, true);

// Se enviou o formulário, salva as alterações
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $cardapioJSON['horarioFuncionamento']['abertura'] = $_POST['abertura'];
    $cardapioJSON['horarioFuncionamento']['fechamento'] = $_POST['fechamento'];

    $cardapioJSON['valoresMarmita']['Pequena'] = floatval($_POST['valorPequena']);
    $cardapioJSON['valoresMarmita']['Grande'] = floatval($_POST['valorGrande']);

    // Cardápio semanal
    foreach ($cardapioJSON['cardapio'] as $dia => $valores) {
        $cardapioJSON['cardapio'][$dia]['carnes'] = array_map('trim', explode(',', $_POST["carnes_$dia"]));
        $cardapioJSON['cardapio'][$dia]['acompanhamentos'] = array_map('trim', explode(',', $_POST["acompanhamentos_$dia"]));
    }

    // Locais de entrega
    $locais = $_POST['locais'];
    $taxas = $_POST['taxas'];
    $novosLocais = [];
    for ($i = 0; $i < count($locais); $i++) {
        if (trim($locais[$i]) !== '') {
            $novosLocais[] = [
                'nome' => trim($locais[$i]),
                'taxa' => floatval($taxas[$i])
            ];
        }
    }
    $cardapioJSON['locaisEntrega'] = $novosLocais;

    // Formas de pagamento
    $cardapioJSON['formasPagamento'] = array_map('trim', explode(',', $_POST['formasPagamento']));

    // Salva no arquivo
    file_put_contents($arquivo, json_encode($cardapioJSON, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    $mensagem = 'Alterações salvas com sucesso!';
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Editor cardapio.json</title>
<style>
body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
h2 { margin-top: 30px; }
label { display: block; margin-top: 10px; }
input, textarea { width: 100%; padding: 5px; margin-top: 5px; }
button { margin-top: 15px; padding: 10px 20px; cursor: pointer; }
.mensagem { margin-top: 10px; font-weight: bold; color: green; }
.mensagem.erro { color: red; }
</style>
</head>
<body>

<h1>Editor do cardapio.json</h1>

<?php if($mensagem): ?>
<p class="mensagem"><?php echo $mensagem; ?></p>
<?php endif; ?>

<form method="post">

<h2>Horário de Funcionamento</h2>
<label>Abertura: <input type="time" name="abertura" value="<?php echo $cardapioJSON['horarioFuncionamento']['abertura']; ?>"></label>
<label>Fechamento: <input type="time" name="fechamento" value="<?php echo $cardapioJSON['horarioFuncionamento']['fechamento']; ?>"></label>

<h2>Valores Marmita</h2>
<label>Pequena: <input type="number" name="valorPequena" value="<?php echo $cardapioJSON['valoresMarmita']['Pequena']; ?>"></label>
<label>Grande: <input type="number" name="valorGrande" value="<?php echo $cardapioJSON['valoresMarmita']['Grande']; ?>"></label>

<h2>Cardápio Semanal</h2>
<?php foreach ($cardapioJSON['cardapio'] as $dia => $valores): ?>
  <h3><?php echo ucfirst($dia); ?></h3>
  <label>Carnes (separadas por vírgula):
    <input type="text" name="carnes_<?php echo $dia; ?>" value="<?php echo implode(', ', $valores['carnes']); ?>">
  </label>
  <label>Acompanhamentos (separados por vírgula):
    <input type="text" name="acompanhamentos_<?php echo $dia; ?>" value="<?php echo implode(', ', $valores['acompanhamentos']); ?>">
  </label>
<?php endforeach; ?>

<h2>Locais de Entrega</h2>
<?php foreach ($cardapioJSON['locaisEntrega'] as $i => $local): ?>
  <label>Nome:
    <input type="text" name="locais[]" value="<?php echo $local['nome']; ?>">
  </label>
  <label>Taxa:
    <input type="number" step="0.01" name="taxas[]" value="<?php echo $local['taxa']; ?>">
  </label>
<?php endforeach; ?>
<!-- Adicionar 3 campos extras para novos locais -->
<?php for ($i = 0; $i < 3; $i++): ?>
  <label>Nome (novo):
    <input type="text" name="locais[]" placeholder="Novo local">
  </label>
  <label>Taxa (novo):
    <input type="number" step="0.01" name="taxas[]" placeholder="0.00">
  </label>
<?php endfor; ?>

<h2>Formas de Pagamento</h2>
<label>Separe por vírgula:
  <input type="text" name="formasPagamento" value="<?php echo implode(', ', $cardapioJSON['formasPagamento']); ?>">
</label>

<button type="submit">Salvar Alterações</button>
</form>

</body>
</html>
