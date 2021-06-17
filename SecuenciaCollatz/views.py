from django.shortcuts import render
from django.http import HttpResponse
from django.core.urlresolvers import reverse

from django.template import Template, Context
from django.conf import settings

import sys, os


def bienvenida(request):
	return HttpResponse("Bienvenido a secuencia Collatz no autorizado")

def plantilla(request):
	return render( request, "plantilla.html" )

def funt_SecuenciaCollatz( sValor=0 ):
	result = []
	while sValor != 1:
		iValor = int( sValor ) * 1
		result.append( iValor )
		#print( " iValor=", iValor )
		if iValor % 2 == 0:
			sValor = iValor / 2
		else:
			sValor = ( iValor * 3 ) + 1
	iValor = int( sValor ) * 1
	result.append( iValor )
	return result

def resultado(request):
	if request.method == "POST":
		valor = request.POST["txtValor"]
		#print( "valor=", valor )
		result = funt_SecuenciaCollatz( valor )
		return render( request, "resultado.html", { "svalor":valor, "result":result } )
	else:
		return render( request, "plantilla.html" )

def plantillaBase(request):
	return render( request, "1base.html" )
