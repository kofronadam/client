async function Call(baseUri, useCase, dtoIn, method) {
  // return fetch
  let response;
  if (!method || method === "get") {
    response = await fetch(
      `${baseUri}/${useCase}${
        dtoIn && Object.keys(dtoIn).length
          ? `?${new URLSearchParams(dtoIn)}`
          : ""
      }`
    );
  } else {
    response = await fetch(`${baseUri}/${useCase}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
  }
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

const baseUri = "http://localhost:3000";

const FetchHelper = {
  traceker: {
    get: async (dtoIn) => {
      return await Call(baseUri, "tracker/get", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "tracker/create", dtoIn, "post");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "tracker/update", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "tracker/delete", dtoIn, "post");
    },
    list: async (dtoIn) => {
      return await Call(baseUri, "tracker/list", dtoIn, "get");
    },
  },

  category: {
    get: async (dtoIn) => {
      return await Call(baseUri, "category/get", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "category/create", dtoIn, "post");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "category/update", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "category/delete", dtoIn, "post");
    },
    list: async () => {
      return await Call(baseUri, "category/list", null, "get");
    },
  },
};

export default FetchHelper;
