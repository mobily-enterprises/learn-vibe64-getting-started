Press **Show me** to open **Dashboard → Database → ERD**. ERD stands for
“entity relationship diagram”: a picture of the tables and how they connect.

Each box is a table and lists its columns. Look at the line between `notes`
and `notebooks`. It comes from the `notebook_id` column in `notes`: every note
stores the id of the notebook it sits in.
