<?php

namespace App\Exceptions;

use App\Exceptions\ClientError;

class NotFoundError extends ClientError
{

    public function __construct(string $message = "Not found") {
        parent::__construct($message, 404, []);
    }
}
