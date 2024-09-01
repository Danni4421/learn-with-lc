<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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
        return $this->hasOne(User::class, 'id', 'user_id')->with('level');
    }

    /**
     * Get post categories
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function slugs(): BelongsToMany
    {
        return $this->belongsToMany(PostCategory::class, 'category_posts');
    }

    /**
     * Get comments from post
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comments(): HasMany
    {
        return $this->hasMany(PostComment::class, 'post_id', 'id')
            ->withCount(['replies', 'comment_likes']);
    }

    /**
     * Like from post
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function post_likes(): HasMany
    {
        return $this->hasMany(PostLike::class, 'post_id', 'id');
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

    /**
     * Add action after delete post
     * 
     * @return void
     */
    public function delete(): void
    {
        $postFiles = $this->files()->get();

        if (count($postFiles)) {
            foreach ($postFiles as $file) {
                $file->delete();
            }
        }

        parent::delete();
    }
}
