variable "lambda_function_name" {
  description = "Lambda function name"
  type        = string
  default     = "hello-world"
}

variable "lambda_role_name" {
  description = "Lambda IAM role name"
  type        = string
  default     = "hello-world-lambda-role"
}

variable "lambda_runtime" {
  description = "Lambda runtime"
  type        = string
  default     = "python3.12"
}

variable "lambda_handler" {
  description = "Lambda handler"
  type        = string
  default     = "lambda_function.handler"
}
