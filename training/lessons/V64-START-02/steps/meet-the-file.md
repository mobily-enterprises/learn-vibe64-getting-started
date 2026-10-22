The greeting is written by a tiny piece of code in a file called
`greeting.mjs`. Press **Show me** to open it in **Dashboard → Files**, which
you saw in the introduction. On a phone, use the files button to see the file
list.

It looks like this:

```js
export function greeting(count) {
  return 'Hello from the server!';
}
```

Here's what it means:

- This is a **function**: a small piece of code the server runs every time you
  press the button.
- `count` is the number of presses so far.
- Whatever comes after `return` is the text the page shows.

Just look for now: don't change anything yet. You'll make your change in the
next step, so Vibe64 can see that the change is yours.
