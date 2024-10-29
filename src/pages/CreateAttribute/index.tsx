import React, { useState } from 'react';
import axios from 'axios';

interface Attribute {
  documentTypesNames: string[];
  name: string;
  required: boolean;
}

const CreateAttributePage: React.FC = () => {
  const [attribute, setAttribute] = useState<Attribute>({
    documentTypesNames: [],
    name: '',
    required: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type} = e.target;
    if (name === 'documentTypesNames') {
      setAttribute((prev) => ({
        ...prev,
        documentTypesNames: value.split(',').map((item) => item.trim()),
      }));
    } else {
      setAttribute((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/attributes', attribute);
      setSuccess('Атрибут успешно создан!');
      setError(null);
      console.log(response.data);
    } catch (error) {
      setError(`Ошибка при создании атрибута->${error}. Попробуйте еще раз.`);
      setSuccess(null);
    }
  };

  return (
    <>
      <h1>Создание атрибута</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Название атрибута:
            <input
              type="text"
              name="name"
              value={attribute.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Типы документов (через запятую):
            <input
              type="text"
              name="documentTypesNames"
              value={attribute.documentTypesNames.join(', ')}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Обязательный:
            <input
              type="checkbox"
              name="required"
              checked={attribute.required}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Создать атрибут</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </>
  );
};

export default CreateAttributePage;