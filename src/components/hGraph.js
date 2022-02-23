import React, { useEffect, useState } from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import Typography from "@material-ui/core/Typography";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

export default function HGraph() {
  const [graphData, setGraphData] = useState({});

  async function getGraphData() {
    try {
      fetch("/api/employee/graph")
        .then((res) => res.json())
        .then((json) => setGraphData(json.data))
        .catch((err) => console.log(err));
    } catch (error) {
      //
    }
  }
  useEffect(() => {
    getGraphData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      background: "white",
      display: "inline-block",
      borderRadius: 16,
    },
    expand: {
      transform: "rotate(0deg)",
      marginTop: -10,
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.short,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: "#ECECF4",
    },
  }));

  const editGraph = async (dragValue, dropValue) => {
    try {
      await fetch("/api/employee/graph/edit", {
        method: "post",
        body: JSON.stringify({
          dragValue,
          dropValue,
        }),
      });
      getGraphData();
    } catch (error) {
      console.log(error);
    }
  };

  function Parent({ data, onCollapse, collapsed }) {
    const classes = useStyles();

    const [{ canDrop, isOver }, drop] = useDrop({
      accept: "children",
      drop: () => ({ name: data.name, id: data.id }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });
    const isActive = canDrop && isOver;
    let backgroundColor = "white";
    if (isActive) {
      backgroundColor = "#ddffd2";
    } else if (canDrop) {
      backgroundColor = "#ffeedc";
    }
    return (
      <Card
        variant="outlined"
        className={classes.root}
        ref={drop}
        style={{ backgroundColor }}
      >
        <CardHeader
          avatar={
            <Tooltip
              title={`${_.size(data.hChildren)} Team leads, ${_.size(
                data.children
              )} Employees`}
              arrow
            >
              <Badge
                style={{ cursor: "pointer" }}
                color="secondary"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                showZero
                invisible={!collapsed}
                overlap="circle"
                badgeContent={_.size(data.organizationChildRelationship)}
                onClick={onCollapse}
              >
                <Avatar className={classes.avatar}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </Avatar>
              </Badge>
            </Tooltip>
          }
          title={data.name}
        />
        <Typography color="textSecondary">{data.designation}</Typography>
        <IconButton
          size="small"
          onClick={onCollapse}
          className={clsx(classes.expand, {
            [classes.expandOpen]: !collapsed,
          })}
        >
          <ExpandMoreIcon />
        </IconButton>
      </Card>
    );
  }

  function Children({ a }) {
    const classes = useStyles();
    const [{ isDragging }, drag] = useDrag({
      item: { id: a.id, name: a.name, type: "children" },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          editGraph(item.id, dropResult.id);
          // alert(`You moved ${item.name} to ${dropResult.name}`);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });
    const opacity = isDragging ? 0.4 : 1;
    return (
      <Card
        variant="outlined"
        className={classes.root}
        ref={drag}
        style={{ cursor: "pointer", opacity }}
      >
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
            </Avatar>
          }
          title={a.name}
        />
      </Card>
    );
  }

  function Node({ o, parent }) {
    const [collapsed, setCollapsed] = useState(o.collapsed);
    const handleCollapse = () => {
      setCollapsed(!collapsed);
    };
    useEffect(() => {
      o.collapsed = collapsed;
    });
    const T = parent
      ? TreeNode
      : (props) => (
          <Tree
            {...props}
            lineWidth={"2px"}
            lineColor={"#bbc"}
            lineBorderRadius={"12px"}
          >
            {props.children}
          </Tree>
        );
    return collapsed ? (
      <T
        label={
          <Parent data={o} onCollapse={handleCollapse} collapsed={collapsed} />
        }
      />
    ) : (
      <T
        label={
          <Parent data={o} onCollapse={handleCollapse} collapsed={collapsed} />
        }
      >
        {_.map(o.children, (a) => (
          <TreeNode label={<Children a={a} />} />
        ))}
        {_.map(o.hChildren, (c) => (
          <Node o={c} parent={o} />
        ))}
      </T>
    );
  }

  const theme = createMuiTheme({
    palette: {
      background: "#ECECF4",
    },
    fontFamily: "Roboto, sans-serif",
  });

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="" paddingTop={5} height="80vh">
        <DndProvider backend={HTML5Backend}>
          <Node o={graphData} />
        </DndProvider>
      </Box>
    </ThemeProvider>
  );
}
