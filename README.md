# IM4_shared_mobility - Mobility Duo - Dokumentation

Kurzbeschreibung des Projekts:

Wir haben uns entschieden, die Mobility API zu nutzen, um die Nutzung von Tier eScootern in einem Umkreis von 500 Metern um einen bestimmten Punkt in Winterthur zu verfolgen. Diese Daten haben wir in unsere Website integriert und mit einer Radargrafik visualisiert. So können die Nutzerinnen und Nutzer die Auslastung der eScooter für jeden Wochentag einzeln betrachten und sehen auf einen Blick, wie häufig die eScooter genutzt werden sowie wann die besten Chancen bestehen, einen eScooter auszuleihen. Zusätzlich haben wir einen CO2-Rechner erstellt, der anzeigt, wie viel CO2 mit einem eScooter im Vergleich zum Auto eingespart werden kann.

Learnings:

Durch dieses Projekt haben wir nicht nur unsere HTML/CSS/JavaScript-Kenntnisse verbessert, sondern auch die Programmiersprache PHP kennengelernt, die wir vorher nicht kannten. Ausserdem war die Arbeit mit myAdmin für die Datenbank neu, da wir im letzten Jahr Subabase verwendet hatten. Das Analysieren, Filtern und Integrieren von API-Daten in die Datenbank war komplett neu für uns. Aber nicht nur das, sondern auch die Erstellung des Radar Charts war für uns eine neue Erfahrung. Wir mussten mit Bedauern in unserer Datenbank feststellen, dass die API fehlerhaft war und uns immer die gleichen Daten lieferte. Deswegen mussten wir einen Plan B entwickeln: Mit der Erlaubnis von Samuel Rhyner und Alen Doko fügten wir im mobility.php file eine Randomisierung ein, sodass unsere Radar Chart eine interessante Grafik lieferte. Wir bedauern es, dass unsere Ergebnisse nun nicht mehr korrekt sind, haben jedoch gelernt, wie ‘einfach’ es ist, solche Daten zu fälschen. Zudem stellten wir am Ende fest, dass unser Design für die responsive Version ziemlich aufwändig und schwierig war, weswegen wir hier viel Zeit investieren mussten.

Schwierigkeiten:

Dataflow: Die von uns aus der Liste ausgewählte API ‘Shared Mobility’ liefterte bloss immer dieselben Daten in unsere Datenbank. Wir kontaktierten daraufhin andere Studenten, welche ebenfalls diese API verwendeten. Ihnen ist dadurch aufgefallen, dass ihre Daten ebenfalls fehlerhaft sind. Ein Kommilitonen erkundigte sich sogar beim Provider, der bestätigte, dass dieses Problem bereits seit dem 29. April bestehe und sie dran sind, dies zu korrigieren.
Wir haben, mit Absprache mit Samuel Rhyner und danach auch mit Alen Doko, uns dazu entschieden, unsere Radar Chart im mobility.php file mit randomisierten Zahlen (welche jedoch ungefähr der Wirklichkeit entsprechen könnten = mehr Verfügbar in der Nacht) zu füttern. 

Responsive Design: Wir haben uns sehr lange mit Responsive Design beschäftigt. Das hat uns viel Zeit und Nerven gekostet. Unser Design ist leider nicht das einfachste, um es responsiv zu gestalten, da es aus vielen verschiedenen Einzelelementen besteht. Trotzdem haben wir verschiedene kleinere Formate erstellt, wie z.B. unser kleinstes Format mit 390px, was der Grösse eines iPhone 13 und 12 entspricht.

Fazit:

Zusammenfassend sind wir stolz auf das Ergebnis, das wir erreicht haben. Wir haben viele Hürden bezwungen und viel Zeit sowie sehr viele Nerven in das Projekt gesteckt. 

Benutzte Ressourcen:

- Chat GPT
- Co-Pilot
- Coachings bei Samuel Rhyner

