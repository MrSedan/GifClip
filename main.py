#!/usr/bin/python3
# -*- coding: utf-8 -*-
import gi, requests, dotenv, os

gi.require_version("Gtk", "3.0")
from gi.repository import Gtk

dotenv.load_dotenv()


class EntryWindow(Gtk.Window):
    def __init__(self):
        super().__init__(title="Entry Demo")
        self.set_size_request(200, 50)

        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)
        self.add(vbox)

        self.entry = Gtk.Entry()
        self.entry.set_text("Hello world")
        vbox.pack_start(self.entry, True, True, 0)
        self.entry.connect("key-press-event", self.on_key_press)
        
        self.button = Gtk.Button(label="Click me")
        self.button.connect("clicked", self.on_button_clicked)
        vbox.pack_start(self.button, True, True, 0)
        
    def on_key_press(self, widget, event):
        print(event.keyval)
    
    def on_button_clicked(self, widget):
        print('Clicked')
        # do a GET request to the Tenor api (tenor.googleapis.com) with an api from the .env file
        url = f"https://tenor.googleapis.com/v2/search?q={self.entry.get_text()}&key={os.getenv('TENOR_API_KEY')}&client_key=my_test_app&limit=8&media_filter=tinygif,gif"
        response = requests.get(url).json()
        print(response['results'][0]['media_formats']['gif']['url'])
        

win = EntryWindow()
win.connect("destroy", Gtk.main_quit)
win.show_all()
Gtk.main()