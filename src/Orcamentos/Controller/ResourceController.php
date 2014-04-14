<?php

namespace Orcamentos\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Orcamentos\Service\Resource as ResourceService;


class ResourceController
{
	// Funcao usada para criar o cliente, via post
	public function create(Request $request, Application $app)
	{	
		$data = $request->request->all();
		
		$data['companyId'] = $app['session']->get('companyId');

    	$data = json_encode($data);
		$resourceService = new ResourceService();
		$resource = $resourceService->save($data, $app['orm.em']);
		$result = array();

		$result['name'] = $resource->getName();
		$result['cost'] = $resource->getCost();
		$typename=$resource->getType()->getName();
		$result['equipmentType']['name'] = $typename;
		$result['id'] = $resource->getId();

		return json_encode($result);
	}

	public function delete(Request $request, Application $app, $resourceId)
	{	
		$em = $app['orm.em'];
		$resource = $em->getRepository('Orcamentos\Model\Resource')->find($resourceId);
		$em->remove($resource);
		$em->flush();
		return $app->redirect('/company');
	}
}