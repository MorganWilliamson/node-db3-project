// scheme-model
const db = require('../../data/db-config');

module.exports = {
    find() {
        return db('schemes');
    },
    findById(id) {
        return db('schemes').where({ id }).first();
    },
    findSteps(id) {
        return db('schemes as sc')
            .join('steps as st', 'sc.id', 'st.scheme_id')
            .select('sc.scheme_name', 'st.step_number', 'st.instructions')
            .where('sc.id', id)
            .orderBy('st.step_number', 'asc');
    },
    add(scheme) {
        return db('schemes').insert(scheme)
            .then(([id]) => {
                return db('schemes').where('id', id).first();
            });
    },
    update(changes, id) {
        return db('scheme').where('id', id).update(changes);
    },
    remove(id) {
        return db('scheme').where('id', id).del();
    }
};


// - `remove(id)`:
//   - Removes the scheme object with the provided id.
//   - Resolves to the removed scheme
//   - Resolves to `null` on an invalid id.
//   - (Hint: Only worry about removing the `scheme`. The database is configured to automatically remove all associated steps.)
