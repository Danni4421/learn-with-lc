<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Post extends Model
{
    use HasFactory;

    /**
     * Define Tablename.
     * 
     * @var string
     */
    protected $table = 'posts';

    /**
     * Define the ability for primary key cannot to incrementing.
     * 
     * @var string
     */
    public $incrementing = false;

    /**
     * Define the key type for the primary key to string.
     * 
     * @var string
     */
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     * 
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'user_id',
        'title',
        'content',
        'status'
    ];

    /**
     * The attributes that are hidden.
     * 
     * @var array<int, string>
     */
    protected $hidden = [
        "user_id"
    ];

    /**
     * This post has own by one user
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function post_owner(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    /**
     * Get comments from post
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function comments(): HasMany
    {
        return $this->hasMany(PostComment::class, 'post_id', 'id');
    }

    /**
     * Get post files or images
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function files(): HasMany
    {
        return $this->hasMany(PostFile::class, 'post_id', 'id');
    }
}