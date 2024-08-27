<?php

namespace App\Exceptions;

class AutheticationError extends ClientError
{
    public function __construct(string $message = 'Not Authenticated', array $errors = [])
    {
        parent::__construct($message,  401, $errors);
    }
}
