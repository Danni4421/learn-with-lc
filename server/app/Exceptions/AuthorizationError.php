<?php

namespace App\Exceptions;

class AuthorizationError extends ClientError
{
    public function __construct(string $message = 'Unauthorized', array $errors = [])
    {
        parent::__construct($message,  403, $errors);
    }
}
