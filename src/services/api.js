const BASE_URL = 'https://rickandmortyapi.com/api';

const normalizePage = (page) => {
  const numericPage = Number(page) || 1;
  return Math.max(1, numericPage);
};

const throwApiError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  throw error;
};

export const getCharacters = async (page = 1) => {
  const safePage = normalizePage(page);
  const res = await fetch(`${BASE_URL}/character?page=${safePage}`);

  if (!res.ok) {
    throwApiError('Error al cargar personajes', res.status);
  }

  return res.json();
};

export const getEpisodes = async (page = 1) => {
  const safePage = normalizePage(page);
  const res = await fetch(`${BASE_URL}/episode?page=${safePage}`);

  if (!res.ok) {
    throwApiError('Error al cargar episodios', res.status);
  }

  return res.json();
};