const backendUrl = import.meta.env.VITE_API_URL;

// PORTAL
export const getPortalProperties = async () => {
  try {
    const result = await fetch(`${backendUrl}/portal`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPortalPropertyId = async (id) => {
  try {
    const result = await fetch(`${backendUrl}/portal/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

// USER
export const verifyUser = async () => {
  try {
    const result = await fetch(`${backendUrl}/user/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const removeUser = async () => {
  try {
    const result = await fetch(`${backendUrl}/user/profile`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const login = async (user) => {
  try {
    const result = await fetch(`${backendUrl}/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const logout = async () => {
  try {
    const result = await fetch(`${backendUrl}/user/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (user) => {
  try {
    const result = await fetch(`${backendUrl}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

// PROPERTIES
export const getUserProperties = async () => {
  try {
    const result = await fetch(`${backendUrl}/properties`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPropertyId = async (id) => {
  try {
    const result = await fetch(`${backendUrl}/properties/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const createProperty = async (property) => {
  try {
    const result = await fetch(`${backendUrl}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(property),
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateProperty = async ({ id, property }) => {
  try {
    const result = await fetch(`${backendUrl}/properties/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify(property),
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const removeProperty = async (id) => {
  try {
    const result = await fetch(`${backendUrl}/properties/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

// UPLOADS
export const uploadAvatar = async (formData) => {
  try {
    const result = await fetch(`${backendUrl}/upload/avatar`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getPropertyImages = async (id) => {
  try {
    const result = await fetch(`${backendUrl}/upload/images/${id}`, {
      method: 'GET',
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const postPropertyImages = async (id, formData) => {
  try {
    const result = await fetch(`${backendUrl}/upload/images/${id}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const deletePropertyImages = async (id, fileName) => {
  try {
    const result = await fetch(`${backendUrl}/upload/images/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      body: JSON.stringify({ fileName }),
    });
    const response = await result.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};
