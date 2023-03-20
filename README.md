# GifClip-Linux: DEPRECATED

## Warning: This branch is a source code for previous version of GifClip. The newier and working version is on `master` branch.

---

GifClip-Linux is a program that grabs gifs from [Tenor](https://tenor.com) website and display them in **GTK-3 Window** and copy it to your clipboard.

---

### Requirements

You can run it with installing requirements (_You need to have Python 3.7+ and pip installed_):

```bash
pip install -r requirements.txt
```

Then you need to set your environment:

```bash
export TENOR_API_KEY=YOUR_API_KEY
```

Or you can just create a `.env` file in project root:

```bash
echo "TENOR_API_KEY=YOUR_API_KEY" > .env
```

---

### Running

To run it you need to execute:

```bash
python3 main.py
```

Or:

```bash
chmod +x main.py # Once time
./main.py
```
