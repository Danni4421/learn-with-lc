<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleValidator
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = auth('api')->user();

        if ($roles[0] == "all") {
            return $next($request);
        }

        if (!$this->hasAnyRole($roles, $user->level->role)) {
            throw new AuthorizationException("Unauthorize");
        }

        return $next($request);
    }

    /**
     * Summary of hasAnyRole
     * @param array $roles
     * @param string $user_role
     * @return bool
     */
    public function hasAnyRole(array $roles = [], string $user_role): bool
    {
        foreach ($roles as $role) {
            if ($role == $user_role) {
                return true;
            }
        }

        return false;
    }
}
