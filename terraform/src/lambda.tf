# Lambda用ZIPの作成
data "archive_file" "lambda" {
  type        = "zip"
  source_file = "${path.module}/lambda/lambda_function.py"
  output_path = "${path.module}/lambda_function.zip"
}

# IAMロールの信頼ポリシーにLambdaサービスを設定
resource "aws_iam_role" "lambda" {
  name = "terraform-hello-world-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

# IAMロールにCloudWatch Logsへ書き込む権限を設定
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Lambdaの作成
resource "aws_lambda_function" "hello_world" {
  function_name    = "terraform-hello-world"
  role             = aws_iam_role.lambda.arn
  runtime          = "python3.12"
  handler          = "lambda_function.handler"
  filename         = data.archive_file.lambda.output_path
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