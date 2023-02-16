#!/usr/bin/python3
# -*- coding: utf-8 -*-
import gi

gi.require_version("Gtk", "3.0")
from gi.repository import Gtk, GLib


class EntryWindow(Gtk.Window):
    def __init__(self):
        super().__init__(title="Entry Demo")
        self.set_size_request(200, 50)

        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)
        self.add(vbox)

        self.entry = Gtk.Entry()
        self.entry.set_text("Hello world")
        self.entry.set_width_chars(-1)
        vbox.pack_start(self.entry, True, True, 0)
        self.entry.connect("key-press-event", self.on_key_press)
        
    def on_key_press(self, widget, event):
        print(event.keyval)


win = EntryWindow()
win.connect("destroy", Gtk.main_quit)
win.show_all()
Gtk.main()