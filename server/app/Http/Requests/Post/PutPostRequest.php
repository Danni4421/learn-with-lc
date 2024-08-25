<?php

namespace App\Http\Requests\Post;

use App\Exceptions\InvariantError;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PutPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:150'],
            'content' => ['required', 'string'],
            'status' => ['required', 'in:open,closed']
        ];
    }

    /**
     * Get the validation message that apply for each rule.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul post perlu untuk diisi.',
            'title.string' => 'Judul post harus berupa karakter.',
            'title.max' => 'Judul memiliki maksimal 150 karakter.',
            'content.required' => 'Isi post perlu untuk diisi.',
            'content.string' => 'Isi post harus berupa karakter.',
            'status.required' => 'Status perlu untuk diisi.',
            'status.in' => 'Status hanya boleh antara open atau closed.',
        ];
    }

    /**
     * Handling validation error
     * 
     * @param Validator $validator
     * @throws HttpResponseException
     * @return never
     */
    public function failedValidation(Validator $validator)
    {
        throw new InvariantError(errors: $validator->errors()->toArray());
    }

    /**
     * Function that will return ready to produce data
     * 
     * @return array<string, string>
     */
    public function getData()
    {
        return [
            'title' => $this->input('title'),
            'content' => $this->input('content'),
            'status' => $this->input('status')
        ];
    }
}
