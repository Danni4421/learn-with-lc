<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CommentFile extends Model
{
    use HasFactory;

    /**
     * Define Tablename.
     * 
     * @var string
     */
    protected $table = 'comment_files';

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
        'comment_id',
        'path',
    ];

    /**
     * The attributes that are hidden.
     * 
     * @var array<int, string>
     */
    protected $hidden = [
        'comment_id',
    ];

    /**
     * Delete a comment file
     * 
     * @return bool
     */
    public function delete(): bool
    {
        $deleted = parent::delete();

        if ($deleted) {
            $commentFileName = last(explode('/', $this->path));
            Storage::drive('public')->delete('comment_files/' . $commentFileName);
        }

        return $deleted;
    }

    /**
     * Get path attribute linked to asset
     * 
     * @param mixed $value
     * @return string
     */
    public function getPathAttribute($value)
    {
        return asset('storage/' . $value);
    }
}
