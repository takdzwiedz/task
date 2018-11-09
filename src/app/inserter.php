<?php


$connect = mysqli_connect("localhost", "root", "", "data");
$filename = "data.json";
$data = file_get_contents($filename);
$array = json_decode($data, true);

//echo "<pre>";
//print_r($array);die();

foreach ($array as $row) {
    $sql = "INSERT INTO data.table(
                    action_reason_id,
                    action_id,
                    action_name,
                    action_description,
                    reason_id,
                    reason_name,
                    reason_description,
                    action_reason_begin,
                    action_reason_end,
                    action_reason_create_id,
                    action_reason_create_user,
                    action_reason_create_date,
                    action_reason_modify_id,
                    action_reason_modify_user,
                    action_reason_modify_date
) VALUES (
'" . $row["action_reason_id"] . "',
'" . $row["action_id"] . "',
'" . $row["action_name"] . "',
'" . $row["action_description"] . "',
'" . $row["reason_id"] . "',
'" . $row["reason_name"] . "',
'" . $row["reason_description"] . "',
'" . $row["action_reason_begin"] . "',
'" . $row["action_reason_end"] . "',
'" . $row["action_reason_create_id"] . "',
'" . $row["action_reason_create_user"] . "',
'" . $row["action_reason_create_date"] . "',
'" . $row["action_reason_modify_id"] . "',
'" . $row["action_reason_modify_user"] . "',
'" . $row["action_reason_modify_date"] . "'

)";

    mysqli_query($connect, $sql);
}

echo "Data inserted";