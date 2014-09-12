<?php
if(isset($_POST['csvdata']) && !empty($_POST['csvdata'])){
	$fn = 'results-'.date('Y-m-d').'.csv';
	$f=fopen($fn, 'w');
	fwrite($f, $_POST['csvdata']);
	fclose($f);
	if(is_link('latest.csv'))unlink('latest.csv');
	symlink($fn, 'latest.csv');
	$filetable = json_decode(file_get_contents('index.json'));
	$filetable[]=$fn;
	$f = fopen('index.json', 'w');
	fwrite($f, json_encode($filetable));
	fclose($f);
}else{
	die('No data!');
}
?>
