<?php

//https://www.unserialize.me/
// https://www.wdb24.com/create-mysql-table-using-php-array/

$array = array (
                    'action_reason_id' => '37',
                    'action_id' => '13',
                    'action_name' => 'Zwrot składki',
                    'action_description' => '',
                    'reason_id' => '5',
                    'reason_name' => 'Nadpłata po rekalkulacji składki OCK',
                    'reason_description' => '',
                    'action_reason_begin' => '2018-10-04',
                    'action_reason_end' => '',
                    'action_reason_create_id' => '1',
                    'action_reason_create_user' => 'System System',
                    'action_reason_create_date' => '2018-10-04',
                    'action_reason_modify_id' => '1',
                    'action_reason_modify_user' => 'System System',
                    'action_reason_modify_date' => '2018-10-04',

        );


$createTableStatement = "CREATE TABLE `table`";
$createTableStatement .= '(';
$createTableStatement .= '`id` INT NOT NULL AUTO_INCREMENT,';

foreach($array as $dataKey => $dataValues)
{
    $getDataType = gettype($dataValues);

    if($getDataType == 'integer')
    {
        $createTableStatement .= '`'.$dataKey.'` int(11) DEFAULT NULL, ';
    }
    elseif($getDataType == 'double')
    {
        $createTableStatement .= '`'.$dataKey.'` float DEFAULT NULL, ';
    }
    elseif($getDataType == 'boolean')
    {
        $createTableStatement .= '`'.$dataKey.'` tinyint(2) DEFAULT NULL, ';
    }
    else
    {
        $createTableStatement .= '`'.$dataKey.'` varchar(255) DEFAULT NULL, ';
    }

}

$createTableStatement .= 'PRIMARY KEY (`id`)';
$createTableStatement .= ')';

$createTableStatement .= "COLLATE='utf8_polish_ci' ENGINE=InnoDB";

echo $createTableStatement;

?>