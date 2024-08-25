<?php

namespace App;

trait HasHelpers
{
    public function asset(string $path) 
    {
        $assetUrl = env('ASSET_URL', config('app.url'));
        return rtrim($assetUrl, '/') . '/' . ltrim($path, '/');
    }
}
