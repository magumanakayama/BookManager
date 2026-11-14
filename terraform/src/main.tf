# プロバイダー
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
    archive = {
      source  = "hashicorp/archive"
      version = ">= 2.0"
    }
  }
}

# リージョンの設定
provider "aws" {
  region = var.aws_region
}

module "lambda" {
  source = "./modules/lambda"
}
