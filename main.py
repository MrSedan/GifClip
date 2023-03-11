#!/usr/bin/python3
# -*- coding: utf-8 -*-
import gi, requests, dotenv, os, sys

gi.require_version("Gtk", "3.0")
from gi.repository import Gtk

if not os.getenv('TENOR_API_KEY'):
    print('TENOR_API_KEY does not stated in environment variables')
    exit()
dotenv.load_dotenv()


class EntryWindow(Gtk.Window):
    def __init__(self):
        super().__init__(title="GifClip")
        
        #TODO: Do working ui from UI builder
        builder = Gtk.Builder()
        try:
            builder.add_from_file('./design.ui')
        except:
            sys.exit(1)

        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)
        self.add(vbox)

        self.entry = Gtk.Entry()
        self.entry.set_text("Hello world")
        vbox.pack_start(self.entry, True, True, 0)
        self.entry.connect("key-press-event", self.on_key_press)
        
        self.button = Gtk.Button(label="Search")
        self.button.connect("clicked", self.on_button_clicked)
        self.images = [Gtk.Image.new_from_file('image.gif') for i in range(10)]
        vbox.pack_start(self.button, True, True, 0)
        self.grid = Gtk.Grid()
        self.grid.set_row_spacing(6)
        self.grid.set_column_spacing(6)
        self.grid.set_margin_top(6)
        self.grid.set_margin_bottom(6)
        self.grid.set_margin_start(6)
        self.grid.set_margin_end(6)
        self.grid.set_column_homogeneous(True)
        self.grid.set_row_homogeneous(True)
        vbox.pack_start(self.grid, True, True, 0)
        self.grid.show()
        
    def on_key_press(self, widget, event):
        print(event.keyval)
    
    def on_button_clicked(self, widget):
        print('Clicked')
        if not os.path.exists('./gifs'):
            os.mkdir('./gifs')
        url = f"https://tenor.googleapis.com/v2/search?q={self.entry.get_text()}&key={os.getenv('TENOR_API_KEY')}&client_key=my_test_app&limit=10&media_filter=tinygif,gif,tinygifpreview"
        response = requests.get(url).json()
        for i, img in enumerate(response['results']):
            gif_url = img['media_formats']['tinygif']['url']
            response = requests.get(gif_url)
            with open(f'./gifs/image{i}.gif', 'wb') as f:
                f.write(response.content)
            image = Gtk.Image.new_from_file(f'./gifs/image{i}.gif')
            ev_box = Gtk.EventBox()
            ev_box.add(image)
            ev_box.show()
            ev_box.connect("button-press-event", self.on_image_clicked)
            self.grid.attach(ev_box, 0, i, 1, 1)
            image.show()
    
    def on_image_clicked(self, widget, event):
        print('Clicked on image...')
        
        

win = EntryWindow()
win.connect("destroy", Gtk.main_quit)
win.show_all()
Gtk.main()