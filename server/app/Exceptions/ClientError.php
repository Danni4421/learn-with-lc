<?php

namespace App\Exceptions;

use Exception;

class ClientError extends Exception
{
    protected array $errors = [];

    public function __construct(string $message = "", int $status_code = 400, array $errors = [])
    {
        parent::__construct(message: $message, code: $status_code);
        $this->errors = $errors;
    }

    public function getStatusCode(): int
    {
        return $this->code;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}
