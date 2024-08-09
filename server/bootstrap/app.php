<?php

use App\Exceptions\ClientError;
use App\Exceptions\ServerError;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

// Middlewares
use App\Http\Middleware\RoleValidator;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->alias([
            'role' => RoleValidator::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage()
                ], 401);
            }
        });

        $exceptions->render(function (ClientError $e) {
            $response = [
                'status' => 'fail',
                'message' => $e->getMessage(),
            ];

            if (!empty($e->getErrors())) $response['errors'] = $e->getErrors();

            return response()->json($response, $e->getStatusCode());
        });

        $exceptions->render(function (ServerError $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        });
    })->create();
