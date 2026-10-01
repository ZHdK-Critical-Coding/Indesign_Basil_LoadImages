# Basil.js: Load Images

[English](README.md)

Ein InDesign-Script, das nach einem Ordner fragt und jedes Bild darin (jpg,
png oder tif) auf eine eigene Seite setzt, proportional eingepasst und
zentriert. Es füllt zuerst die Seiten, die schon im Dokument sind, und legt
bei Bedarf neue an. Geschrieben mit
[basil.js](https://basiljs2.netlify.app), einer Bibliothek, die die Idee von
Processing nach InDesign bringt. Ein Ausgangspunkt, um aus einem Ordner
Fotobücher oder Kontaktbögen zu erzeugen.

## Installation

Voraussetzungen: Adobe InDesign. Die Bibliothek liegt in `basiljs/`
(basil.js 2.0.0-beta, Build 2025-01-19, mit Quellcode, Tests und
Tutorials; basil.js steht unter der MIT-Lizenz); das Script liegt in
`Basil Scripts/load_folder/load_folder.jsx`.

1. Basil-Scripts laden die Bibliothek mit diesen zwei Zeilen:
   ```js
   // @includepath "~/Documents/;%USERPROFILE%Documents";
   // @include "basiljs/basil.js";
   ```
   InDesign erwartet die Bibliothek deshalb in `~/Documents/basiljs`. Das
   Installations-Script kopiert sie dorthin. Ein Terminal im Ordner des
   Repositorys öffnen und ausführen:
   - **macOS**: `./install_basil.sh`
   - **Windows**: `powershell -ExecutionPolicy Bypass -File install_basil.ps1`

   Ist basil.js schon installiert (z. B. von einem anderen
   Basil-Beispiel), lässt das Script es unverändert und meldet das.

   Statt einer Kopie geht auch ein symbolischer Link; die Bibliothek bleibt
   dann im Repository:
   ```sh
   ln -s "/pfad/zu/Indesign_Basil_LoadImages/basiljs" ~/Documents
   ```
   Oder die Zeile `@includepath` auf den Ort ändern, an dem die Bibliothek
   tatsächlich liegt.
2. In InDesign das Scripts-Panel öffnen (*Fenster → Hilfsprogramme →
   Skripte*), mit Rechtsklick auf den Ordner *Benutzer* *Im Finder
   anzeigen* wählen und den Ordner `Basil Scripts` dort hinein verlinken:
   ```sh
   ln -s "/pfad/zu/Indesign_Basil_LoadImages/Basil Scripts" "/pfad/zum/angezeigten/Scripts Panel"
   ```

Mehr zur Einrichtung: die offizielle
[Getting-Started-Anleitung](https://basiljs2.netlify.app/tutorials/01-getting-started/).
Alle Funktionen: [basil.js-Referenz](https://basiljs2.netlify.app/reference/).

## Ausführen

Im Scripts-Panel auf `load_folder.jsx` doppelklicken und einen Ordner mit
Bildern wählen.

Die Tutorials in `basiljs/scripts/tutorials` wurden für basil.js 1.x
geschrieben, wo jede Funktion das Präfix `b.` hatte und jedes Script mit
`b.go()` endete. Funktioniert ein Tutorial nicht, die `b.`-Präfixe und die
letzte Zeile `b.go();` entfernen.

## Coding-Hilfe

Die Scripts sind in ExtendScript geschrieben (ein alter
JavaScript-Dialekt). Ein Basil-Script definiert `draw()` und optional
`setup()`, das einmal davor läuft; basil ruft beide automatisch auf, sobald
die Bibliothek eingebunden ist.

- **`load_folder.jsx` → `setup()`**: öffnet `Folder.selectDialog()` und
  speichert den gewählten Ordner in `_folder`.
- **`load_folder.jsx` → `draw()`**: listet die Dateien im Ordner mit
  `getFiles()` auf und behält nur Bilder. Der reguläre Ausdruck
  `/\.(jpg|jpeg|png|tif|tiff)$/i` bestimmt, welche Dateitypen verwendet
  werden – für andere Formate erweitern.
- **Die Schleife**: Für jedes Bild nimmt `page(i + 1)` die nächste Seite,
  die schon im Dokument ist (`pageCount()` sagt, wie viele es gibt); sind
  alle belegt, hängt `addPage()` eine neue Seite am Ende an. `bounds()`
  liefert die Seitengrösse, und `rect()`
  zeichnet einen Rahmen über die ganze Seite. Das Bild wird mit `place()` in
  den Rahmen gesetzt und mit `FitOptions.PROPORTIONALLY` und
  `FitOptions.CENTER_CONTENT` eingepasst. Mit
  `FitOptions.FILL_PROPORTIONALLY` füllt es stattdessen die Seite; für einen
  Rand die Werte in `rect()` ändern.
