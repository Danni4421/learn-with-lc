<?php

namespace App;

trait HasHelpers
{
    /**
     * Summary of asset
     * @param string | null $path
     * @return string
     */
    public function asset(string | null $path = '') 
    {
        $assetUrl = env('ASSET_URL', config('app.url'));
        return rtrim($assetUrl, '/') . '/' . ltrim($path, '/');
    }
}
