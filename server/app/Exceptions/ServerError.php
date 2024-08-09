<?php

namespace App\Exceptions;

use Exception;

class ServerError extends Exception
{
    public function __construct(string $message = "", int $status_code = 500)
    {
        parent::__construct(message: $message, code: $status_code);
    }

    public function getStatusCode(): int
    {
        return $this->code;
    }
}
