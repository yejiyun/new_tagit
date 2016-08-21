<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html">
<html>
<head>
<tiles:insertAttribute name="include" />
</head>
<body>
	<header id="header"> <tiles:insertAttribute name="header" /> </header>
	<nav><tiles:insertAttribute name="nav"/></nav>
	<tiles:insertAttribute name="article" />
	<footer id="footer"> <tiles:insertAttribute name="footer" /> </footer>
</body>
</html>