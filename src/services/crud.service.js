const postgres = require('postgres');

const sql = postgres('postgres://postgres:caio1212@localhost:5432/to_do');

async function searchList() {
  try {
    const search = await sql`
        SELECT 
            l.title, l.description, s.name
        FROM list AS l
        INNER JOIN status AS s
        ON l.status_id = s.id;
    `;
    return search;
  } catch (error) {
    return error;
  }
}

async function createList(status, title, desc) {
  try {
    const created = await sql`
        INSERT INTO list (status_id, title, description)
        VALUES
            (${status}, ${title}, ${desc})
        RETURNING *; 
    `;
    return created[0]; // Retorna o primeiro registro inserido
  } catch (error) {
    return error;
  }
}

async function editStatus(id, status) {
  try {
    const patchList = await sql`
        UPDATE list
        SET
            status_id = ${status}
        WHERE id = ${id}
        RETURNING *
    `;
    return patchList;
  } catch (error) {
    return error;
  }
}

async function deleteList(id) {
  try {
    const del = await sql`
            DELETE FROM list WHERE id = ${id}
        `;
    return del;
  } catch (error) {
    return error;
  }
}

async function updateList(id, status, title, desc) {
  try {
    const update = await sql`
            UPDATE list
            SET
                status_id = ${status},
                title = ${title},
                description = ${desc}
            WHERE id = ${id}
            RETURNING *;
        `;
    return update;
  } catch (error) {
    return error;
  }
}

module.exports = {
  searchList,
  createList,
  editStatus,
  deleteList,
  updateList,
};
