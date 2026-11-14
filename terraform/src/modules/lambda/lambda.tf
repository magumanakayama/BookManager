locals {
  lambda_service_principal = "lambda.amazonaws.com"
  lambda_policy_arn        = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  lambda_source_file       = "${path.module}/lambda_function.py"
  lambda_zip_path          = "${path.module}/lambda_function.zip"
}

# Lambda用ZIPの作成
data "archive_file" "lambda" {
  type        = "zip"
  source_file = local.lambda_source_file
  output_path = local.lambda_zip_path
}

# IAMロールの信頼ポリシーにLambdaサービスを設定
resource "aws_iam_role" "lambda" {
  name = var.lambda_role_name

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = local.lambda_service_principal
      }
    }]
  })
}

# IAMロールにCloudWatch Logsへ書き込む権限を設定
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda.name
  policy_arn = local.lambda_policy_arn
}

# Lambdaの作成
resource "aws_lambda_function" "hello_world" {
  function_name    = var.lambda_function_name
  role             = aws_iam_role.lambda.arn
  runtime          = var.lambda_runtime
  handler          = var.lambda_handler
  filename         = local.lambda_zip_path
  source_code_hash = data.archive_file.lambda.output_base64sha256

  depends_on = [aws_iam_role_policy_attachment.lambda_logs]
}

# 結果出力
output "lambda_function_name" {
  value = aws_lambda_function.hello_world.function_name
}

output "lambda_function_arn" {
  value = aws_lambda_function.hello_world.arn
}