<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PostComment extends Model
{
    use HasFactory;

    /**
     * Define Tablename.
     * 
     * @var string
     */
    protected $table = 'comments';

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
        'post_id',
        'user_id',
        'comment',
    ];

    /**
     * The attributes that are hidden.
     * 
     * @var array<int, string>
     */
    protected $hidden = [
        'post_id',
        'user_id'
    ];

    /**
     * This comment belongs to specific post
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class, 'id', 'post_id');
    }

    /**
     * Replies from comment
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function replies(): HasMany
    {
        return $this->hasMany(CommentReply::class, 'comment_id', 'id');
    }

    /**
     * Like from comment
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comment_likes(): HasMany
    {
        return $this->hasMany(CommentLike::class, 'comment_id', 'id');
    }

    /**
     * Comment files as an images
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function comment_files(): HasMany
    {
        return $this->hasMany(CommentFile::class, 'comment_id', 'id');
    }

    /**
     * This comment has one owner or user
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function comment_owner(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
