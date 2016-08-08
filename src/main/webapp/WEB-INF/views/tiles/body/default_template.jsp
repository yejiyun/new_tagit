<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<tiles:insertAttribute name="header" />
</head>
<body>
	<tiles:insertAttribute name="menu" />
	<tiles:insertAttribute name="body" />
	<tiles:insertAttribute name="footer" />

</body>
</html>