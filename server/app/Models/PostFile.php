<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class PostFile extends Model
{
    use HasFactory;

    /**
     * Define Tablename.
     * 
     * @var string
     */
    protected $table = 'post_files';

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
        'path',
    ];

    /**
     * The attributes that are hidden.
     * 
     * @var array<int, string>
     */
    protected $hidden = [
        'post_id',
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
     * Add another action for delete function
     * 
     * @return bool
     */
    public function delete(): bool
    {
        $deleted = parent::delete();

        if ($deleted) {
            $postFileName = last(explode('/', $this->path));
            Storage::drive('public')->delete('post_files/' . $postFileName);
        }

        return $deleted;
    }

    public function getPathAttribute($value)
    {
        return asset('storage/' . $value);
    }
}
