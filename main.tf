





resource "aws_ecs_task_definition" "service" {
  family                = "service"
  container_definitions = file("definitions.json")
}

resource "aws_ecs_cluster" "vaccination_cluster" {
  name = "vaccination_cluster"

  /*setting {
    name  = "containerInsights"
    value = "enabled"
  }*/
}

resource "aws_ecs_service" "postgraphile_service" {
  name            = "postgraphile_service"
  cluster         = aws_ecs_cluster.vaccination_cluster.id
  task_definition = aws_ecs_task_definition.service.arn
  desired_count   = 1
  iam_role        = aws_iam_role.foo.arn
  depends_on      = [aws_iam_role_policy.foo]

  ordered_placement_strategy {
    type  = "binpack"
    field = "cpu"
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.foo.arn
    container_name   = "mongo"
    container_port   = 8080
  }

  placement_constraints {
    type       = "memberOf"
    expression = "attribute:ecs.availability-zone in [us-west-2a, us-west-2b]"
  }
}