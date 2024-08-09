<?php

namespace App\Exceptions;

use App\Exceptions\ClientError;

class InvariantError extends ClientError
{    
    public function __construct(string $message = 'Bad request', array $errors = [])
    {
        parent::__construct($message,  400, $errors);
    }
}
